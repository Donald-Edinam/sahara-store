import mongoose from 'mongoose';

class BaseModel {
    constructor(schemaDefinition, modelName) {
        this.schema = new mongoose.Schema(schemaDefinition);
        this.model = mongoose.model(modelName, this.schema);
    }

    async create(data) {
        try {
            const item = new this.model(data);
            return await item.save();
        } catch (error) {
            throw new Error(`Error creting item: ${error.message}`);
        }
    }
}