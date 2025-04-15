import { useState } from "react";
import { useRouter } from "next/router";
import { Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

//Components
import { Notification } from "../Common/Notifications";

//Urql
import { useMutation, useQuery } from "urql";
import { GET_SINGLE_ORDER, UPDATE_ORDER_NOTE } from "@/Urql/Query/Order/order.query";

const OrderNote = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState(false);

    //Initialize Form
    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    //Urql
    const [{ data }, refetch] = useQuery({ query: GET_SINGLE_ORDER, variables: { getOrderId: router.query.id } });
    const [{ data: update, error, fetching }, mutate] = useMutation(UPDATE_ORDER_NOTE);

    //Handler on Submit
    const onSubmit = (value) => {
        mutate({ orderNoteId: data?.getOrder.id, note: value.note }).then(({ data }) => {
            setNotification(true)
            if (data?.orderNote.success) {
                refetch({ requestPolicy: "network-only" })
                reset()
            }
        }).catch(() => {
            setNotification(true)
        })
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    if (!data) return null;

    return (
        <div className="mt-8">
            <Notification
                open={notification}
                handleClose={onNotification}
                severity={error?.message ? "error" : "success"}>
                {error?.message ?? update?.orderNote.message}
            </Notification>
            <h4 className="text-lg font-semibold">Notes</h4>
            <p className="mt-4 text-sm">{data.getOrder.note}</p>
            <h4 className="text-lg font-semibold mt-4">Add/Upate</h4>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <Textarea
                    label="Order note"
                    color="red"
                    {...register("note", { required: true })}
                    required />
                <div className="text-right mt-10">
                    <button
                        className="bg-main uppercase font-semibold py-2 text-white px-4 rounded-md text-sm relative w-max"
                        type="submit"
                        disabled={fetching}>
                        <span className={fetching ? "opacity-30" : "opacity-100"}>Save Note</span>
                        <div className="absolute top-1/2 left-1/2  -translate-y-1/2  -translate-x-1/2">
                            {fetching &&
                                <div
                                    className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderNote;