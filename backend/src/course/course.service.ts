import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getRepository, ILike } from 'typeorm';

import { CreateCourseDto, UpdateCourseDto } from './course.dto';
import { Course } from './course.entity';
import { CourseQuery } from './course.query';

@Injectable()
export class CourseService {
  async save(createCourseDto: CreateCourseDto): Promise<Course> {
    return await getRepository(Course).save(createCourseDto);
  }

  async findAll(courseQuery: CourseQuery): Promise<Course[]> {
    Object.keys(courseQuery).forEach((key) => {
      courseQuery[key] = ILike(`%${courseQuery[key]}%`);
    });
    return await getRepository(Course).find({
      where: courseQuery,
      order: {
        name: 'ASC',
        description: 'ASC',
      },
    });
  }

  async findById(id: string): Promise<Course> {
    const course = await getRepository(Course).findOne(id);
    if (!course) {
      throw new HttpException(
        `Could not find course with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findById(id);
    return await getRepository(Course).save({
      id: course.id,
      ...updateCourseDto,
    });
  }

  async delete(id: string): Promise<string> {
    const course = await this.findById(id);
    await getRepository(Course).remove(course);
    return id;
  }

  async count(): Promise<number> {
    return await getRepository(Course).count();
  }
}
