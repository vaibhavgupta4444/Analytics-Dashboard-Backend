import { Document } from "mongoose";

export interface Base extends Document{
    createdAt: Date;
    updatedAt: Date;
}