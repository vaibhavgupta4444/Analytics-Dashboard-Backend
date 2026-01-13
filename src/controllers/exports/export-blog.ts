import { Request, Response } from "express";
import Blog from "../../models/Blog.js";
import ExcelJS from "exceljs";

export const exportBlogsToExcel = async (req: Request, res: Response) => {
  try {
    const {
      title,
      content,
      authorId,
      category,
      tags,
      status,
      views,
      likes,
      commentsCount,
      startDate,
      endDate,
      count
    } = req.query;

    const filters:any = {};
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }

    // Content search
    if (content) {
      filters.content = { $regex: content, $options: "i" };
    }

    // Author filter
    if (authorId) {
      filters.authorId = authorId;
    }

    // Category filter
    if (category) {
      filters.category = category;
    }

    // Tags filter (any matching tag)
    if (tags) {
      filters.tags = { $in: (tags as string).split(",") };
    }

    // Status filter
    if (status) {
      filters.status = status;
    }

    // Numeric filters (minimum values)
    if (views) {
      filters.views = { $gte: Number(views) };
    }

    if (likes) {
      filters.likes = { $gte: Number(likes) };
    }

    if (commentsCount) {
      filters.commentsCount = { $gte: Number(commentsCount) };
    }

    // Date range filter
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.$gte = new Date(startDate as string);
      if (endDate) filters.createdAt.$lte = new Date(endDate as string);
    }

    // Execute query
    const blogs = await Blog.find(filters)
      .limit(count ? Number(count) : 0)
      .sort({ createdAt: -1 })
      .lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Blogs");

    worksheet.columns = [
      { header: "Title", key: "title", width: 30 },
      { header: "Category", key: "category", width: 20 },
      { header: "Content", key: "content", width: 60 },
      { header: "Views", key: "views", width: 12 },
      { header: "Likes", key: "likes", width: 12 },
      { header: "Created Date", key: "createdAt", width: 18 }
    ];

 
    worksheet.getRow(1).font = { bold: true };

    blogs.forEach((blog) => {
      const row = worksheet.addRow({
        title: blog.title,
        category: blog.category,
        content: blog.content,
        views: blog.views,
        likes: blog.likes,
        createdAt: blog.createdAt.toISOString().split("T")[0]
      });

      const contentLength = blog.content?.length || 0;

      if (contentLength > 100) {
        row.height = Math.min(100, Math.ceil(contentLength / 2));
      }

      row.getCell("content").alignment = {
        wrapText: true,
        vertical: "top"
      };
    });

 
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=blogs.xlsx"
    );


    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to export blogs" });
  }
};