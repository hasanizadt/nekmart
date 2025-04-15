import Image from "next/image";

//Urql
import { useQuery } from "urql";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";

const Profile = () => {
    //Urql
    const [{ data }] = useQuery({ query: GET_SELLER_PROFILE });

    return (
        <div className="border-b border-solid border-gray-200 pb-4">
            <Image
                src={process.env.NEXT_PUBLIC_IMAGE_URL + data?.getSellerProfile.banner}
                alt={data?.getSellerProfile.shopName}
                width={1600}
                height={300} />
            <div className="flex items-end gap-3 -mt-6 px-5">
                <div>
                    <Image
                        src={process.env.NEXT_PUBLIC_IMAGE_URL + data?.getSellerProfile.logo}
                        alt={data?.getSellerProfile.shopName}
                        width={300}
                        height={300}
                        className="border-2 border-solid border-main rounded-full w-[80px] h-[80px]" />
                </div>
                <div className="mb-2">
                    <h4 className="text-base font-bold">{data?.getSellerProfile.shopName}</h4>
                    <p className="text-sm">+{data?.getSellerProfile.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;