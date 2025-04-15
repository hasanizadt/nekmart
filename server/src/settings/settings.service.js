import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class SettingService {
    //Constructor
    constructor(settingRepository) {
        this.settingRepository = settingRepository;
    };

    //Get Site Settings
    async get() {
        const sites = await this.settingRepository.findOne({
            where: {}
        });
        if (!sites) throw new NotFoundException("Please update your site settings first!")
        return sites;
    }

    //Save or add site settings
    async site(siteInput) {
        const setting = await this.settingRepository.findOne({
            where: {}
        });
        if (!setting) {
            const newSetting = this.settingRepository.create(siteInput);
            await this.settingRepository.save(newSetting);
        } else {
            await this.settingRepository.update(setting.id, siteInput);
        }
        return {
            success: true,
            message: "Settings saved successfully!"
        }
    }
}