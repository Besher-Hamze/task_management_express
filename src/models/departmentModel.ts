import { Schema, model, Document } from 'mongoose';

interface Department extends Document {
  name: string;
  description: string;
  departmentRole: string[];
  parentDepartment: string;
  //todo files
}

const departmentSchema = new Schema<Department>({
    name: { type: String, required: true },
  description: { type: String, required: true },
  departmentRole: { type: [String], required: true },
  parentDepartment: { type: String, required: true },
});

export default model<Department>('Department', departmentSchema);
