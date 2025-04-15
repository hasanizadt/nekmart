import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class AddressService {
    //Constructor
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    };

    //Get Address
    async get(reqUser) {
        const address = await this.addressRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            order: {
                created_at: "ASC"
            }
        });
        return address;
    }

    //Add Address
    async add(addressInput, reqUser) {
        const address = await this.addressRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const newAddress = this.addressRepository.create(
            { ...addressInput, default: address === 0 ? true : false, user: { id: reqUser.id } }
        );
        await this.addressRepository.save(newAddress);
        return {
            success: true,
            message: "Address added successfully!"
        }
    };

    //Update Address
    async update(addressInput, id) {
        const result = await this.addressRepository.update(id, addressInput);
        if (result.affected === 0) throw new NotFoundException("Address not found!");
        return {
            success: true,
            message: "Address updated successfully!"
        }
    };

    // Mark address as default address
    async mark(id, reqUser) {
        await this.addressRepository.update({}, { default: false });
        await this.addressRepository.update({
            user: { id: reqUser.id },
            id: id
        }, { default: true });
        return {
            success: true,
            message: "Address is marked as default!"
        }
    };

    //Delete Address
    async delete(id) {
        const address = await this.addressRepository.findOne({
            where: { id }
        })
        if (address.default === true) throw new NotFoundException("Default address can't be deleted!");
        await this.addressRepository.softDelete({
            id
        });
        return {
            success: true,
            message: "Address deleted successfully!"
        }
    };
}