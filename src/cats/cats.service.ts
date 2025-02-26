import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from './schemas/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    try {
      const createdCat = new this.catModel(createCatDto);
      return await createdCat.save();
    } catch (error) {
      throw new HttpException('Error creating cat', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Cat[]> {
    try {
      return await this.catModel.find().exec();
    } catch (error) {
      throw new HttpException(
        'Error finding cats',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Cat> {
    try {
      const cat = await this.catModel.findById(id).exec();
      if (!cat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      return cat;
    } catch (error) {
      throw new HttpException(
        'Error finding cat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    try {
      const updatedCat = await this.catModel
        .findByIdAndUpdate(id, updateCatDto, { new: true })
        .exec();

      if (!updatedCat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      return updatedCat;
    } catch (error) {
      throw new HttpException('Error updating cat', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<Cat> {
    try {
      const deletedCat = await this.catModel.findByIdAndDelete(id).exec();
      if (!deletedCat) {
        throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
      }
      return deletedCat;
    } catch (error) {
      throw new HttpException('Error deleting cat', HttpStatus.BAD_REQUEST);
    }
  }
}
