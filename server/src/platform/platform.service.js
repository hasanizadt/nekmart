import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class PlatformService {
    //Constructor
    constructor(platformRepository) {
        this.platformRepository = platformRepository;
    };

    //Get platforms
    async get() {
        const platform = await this.platformRepository.findOne({
            where: {}
        });
        if (!platform) throw new NotFoundException("Platform charge is not set yet!");
        return platform;
    }

    //Add platform
    async add(platformInput) {
        const platform = await this.platformRepository.findOneBy({});
        if (platform) {
            await this.platformRepository.update(platform.id, {
                charge: platformInput.charge
            })
            return {
                success: true,
                message: "Platform updated successfully!"
            }
        } else {
            const newPlatform = this.platformRepository.create({ charge: platformInput.charge });
            await this.platformRepository.save(newPlatform);
            return {
                success: true,
                message: "Platform added successfully!"
            }
        }
    }
}