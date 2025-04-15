import { Injectable } from "@nestjs/common";

@Injectable()
export class PointService {
    //Constructor
    constructor(userPointRepository, pointRepository) {
        this.userPointRepository = userPointRepository;
        this.pointRepository = pointRepository;
    };

    //Get Points
    async get(reqUser) {
        const points = await this.pointRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            order: {
                created_at: "DESC"
            },
            relations: {
                order: true
            }
        });
        return points;
    };

    //Get User Points
    async getPoints(reqUser) {
        const points = await this.userPointRepository.findOne({
            where: {
                user: { id: reqUser.id }
            }
        });
        return points;
    }
}