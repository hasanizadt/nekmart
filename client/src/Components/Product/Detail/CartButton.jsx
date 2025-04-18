import { useState } from "react";
import { useRouter } from "next/router";

//Components
import { Notification } from "@/Components/Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_PROFILE } from "@/Urql/Query/Account/profile.query";
import { ADD_CART, GET_CART } from "@/Urql/Query/Cart/cart.query";

const CartButton = ({
    sellerId,
    reserved,
    attributes,
    minPurchase,
    onError,
    hasAttributes,
    attributeLength
}) => {
    //Initializing Hooks
    const router = useRouter();

    //State
    const [notification, setNotification] = useState(false);

    //ID
    const parts = router.query && router.query.id?.toString().split("-")
    const id = parts[parts.length - 1];

    //Urql
    const [{ data: profile }] = useQuery({ query: GET_PROFILE });
    const [_, refetch] = useQuery({ query: GET_CART });
    const [{ data, error, fetching }, mutate] = useMutation(ADD_CART);

    //On Wishlist Handler
    const onCartHandler = () => {
        if (!profile) {
            router.push("/account/login")
        } else {
            if (attributes.length < attributeLength && hasAttributes) {
                onError();
            } else {
                const formData = {
                    productId: id,
                    seller: sellerId,
                    reserved: reserved,
                    attributes
                }
                mutate({ cartInput: formData }).then(({ data }) => {
                    setNotification(true)
                    if (data?.addCart.message) {
                        refetch({ requestPolicy: "network-only" })
                    }
                }).catch(() => {
                    setNotification(true)
                })
            }
        }
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="relative">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}>
                {error?.message ?? data?.addCart.message}
            </Notification>
            <button
                className={`w-full py-2.5 bg-[#dd9f08] text-sm font-semibold mb-3 text-white rounded-lg relative ${reserved < Number(minPurchase) ? "opacity-60" : ""}`}
                disabled={reserved < Number(minPurchase)}
                onClick={onCartHandler}>
                Add to Cart
                <div className="absolute top-1/2 right-5 -translate-y-1/2">
                    {fetching &&
                        <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin"></div>
                    }
                </div>
            </button>
        </div>
    );
};

export default CartButton;