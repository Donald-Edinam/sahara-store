import mongoose from 'mongoose';

class BaseModel {
    constructor(schemaDefinition, modelName) {
        this.schema = new mongoose.Schema(schemaDefinition);
        this.model = mongoose.model(modelName, this.schema);
    }

    async create(data) {
        if (!data && typeof data !== 'object') {
            throw new Error('Invalid data provided for creating the document');
        }

        try {
            const item = new this.model(data);
            return await item.save();
        } catch (error) {
            throw new Error(`Error creating item: ${error.message}`);
        }
    }

    async findAll() {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(`Error finding items: ${error.message}`);
        }
    }

    async findById(id) {
        if (!id) {
            throw new Error('Id is required to find the item');
        }

        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(`Error finding item: ${error.message}`);
        }
    }

    async update(id, updateData) {
        if (!id) {
            throw new Error('Id is required to update item');
        }

        if (!updateData && typeof updateData !== 'object') {
            throw new Error('Invalid data provided for updating the document');
        }

        try {
            return await this.model.findByIdAndUpdate(id, updateData, { new: true });
        } catch (error) {
            throw new Error(`Error updating item: ${error.message}`);
        }
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id is required to delete item');
        }
        
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting item: ${error.message}`);
        }
    }

    async find(searchQuery) {
        if (!searchQuery && typeof searchQuery !== 'object') {
            throw new Error('Invalid search query');
        }

        try {
            return await this.model.find(searchQuery);
        } catch (error) {
            throw new Error(`Error finding items: ${error.message}`);
        }
    }
}

export default BaseModel;