import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import moment from "moment";
import QRCode from "react-qr-code";

//Urql
import { useQuery } from "urql";
import { GET_SINGLE_ORDER } from "@/Urql/Query/Order/order.query";

const Invoice = () => {
    //Initialize Hook
    const router = useRouter();

    //Urql
    const [{ data }] = useQuery({ query: GET_SINGLE_ORDER, variables: { orderSellerId: router.query.id } });

    return (
        <div className="">
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <Image src="/images/logo.png" alt="logo" width={270} height={60} />
                    <h4 className="mt-2.5 mb-px"><strong>Address:</strong> ShikderTower (2nd Floor). B-116/1 Shobanbag, Savar, Dhaka-1340</h4>
                    <h4 className="mb-px"><strong>Email:</strong> nekmartbd@gmail.com</h4>
                    <h4><strong>Phone:</strong> +8801683838384</h4>
                </div>
                <div className="text-right mt-4">
                    <QRCode
                        value={data?.getSingleOrderBySeller.order?.orderId}
                        size={80}
                        className="ml-auto" />
                    <h4 className="text-lg font-semibold">Invoice</h4>
                    <h6><strong>Order ID:</strong> <span className="text-main font-semibold">{data?.getSingleOrderBySeller.order?.orderId}</span></h6>
                    <h6><strong>Date:</strong> {moment(data?.getSingleOrderBySeller.created_at).format("DD MMM YYYY")}</h6>
                </div>
            </div>
            <hr className="border-gray-400 mt-6" />
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-5">Products</h4>
                <div className="border border-solid border-gray-300 px-5 pb-5 rounded-md">
                    {data?.getSingleOrderBySeller.products.map((item, i) => (
                        <Fragment key={i}>
                            <div className="flex gap-5 my-5 items-center">
                                <Image
                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + item.productId?.images[0]}
                                    alt={item.productId?.name}
                                    width={300}
                                    height={300}
                                    className="w-[50px] rounded-md" />
                                <div className="flex-1">
                                    <p className=" line-clamp-1">
                                        {item.productId?.name}
                                    </p>
                                    <p className="text-sm flex gap-4">
                                        {item.variation.map((v, vi) => (
                                            <span key={vi}><span>{v.name}</span>: <span>{v.variant}</span></span>
                                        ))}
                                    </p>
                                </div>
                                <p className="font-semibold">×{item.quantity}</p>
                                <p className="font-bold">Est. {item.productId?.estimateDelivery || data.getSingleOrderBySeller.order?.estimateDelivery} day(s)</p>
                            </div>
                            <hr className="border-gray-300" />
                        </Fragment>
                    ))}
                    <div className="mt-5 text-center">
                        <p className="font-semibold">Please attach this pdf into your products!</p>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-5">Order Summery</h4>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Items</span>
                    <span>৳{data?.getSingleOrderBySeller.price}</span>
                </div>
                <div className="flex gap-5 text-[15px] mb-2">
                    <span className="flex-1 font-semibold">Tax</span>
                    <span>৳{data?.getSingleOrderBySeller.products.reduce((a, b) => a + b.tax, 0)}</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex gap-5 text-[15px] mt-2">
                    <span className="flex-1 font-semibold">Subtotal</span>
                    <span className="text-main font-bold">৳{data?.getSingleOrderBySeller.price + Number(data?.getSingleOrderBySeller.products.reduce((a, b) => a + b.tax, 0))}</span>
                </div>
            </div>
            <div className="text-center mt-32 text-sm">
                <h4>This is system generated invoice!</h4>
            </div>
        </div>
    );
};

export default Invoice;