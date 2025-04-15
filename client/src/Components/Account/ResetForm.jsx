import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

//Container
import { Notification } from "../Common/Notifications";
import Container from "../Common/Container";

//Urql
import { useMutation } from "urql";
import { RESET_PASSWORD } from "@/Urql/Query/Account/auth.query";

const ResetForm = () => {
    //Initialize Hook
    const router = useRouter();

    //State
    const [notification, setNotification] = useState(false);

    //Urql
    const [{ error, fetching }, mutate] = useMutation(RESET_PASSWORD);

    //Initialize Form
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    //Decode Message
    const phone = nextBase64.decode(router.query.token);

    //Submit Handler
    const onSubmit = (value) => {
        mutate({ resetPasswordInput: { phone: "88" + phone, ...value } }).then(({ error, data }) => {
            if (error) {
                setNotification(true)
            }
            if (data?.resetPassword.success) {
                router.push(`/account/login`)
            }
        }).catch(() => {
            setNotification(true)
        })
    }

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <section>
            <Container className="py-14">
                <Notification open={notification} handleClose={onNotification} severity="error">
                    {error?.message}
                </Notification>
                <div
                    className="w-[45%] mx-auto text-center border border-solid border-gray-200 px-8 py-8 rounded-md">
                    <h4 className="text-lg font-semibold uppercase mb-4">Reset Password!</h4>
                    <p>Enter your phone, code and new password and confirm password.</p>
                    <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5">
                            <Input
                                crossOrigin="anonymous"
                                label="Verification code"
                                color="red"
                                {...register("code", {
                                    required: true,
                                })}
                                error={errors.code ? true : false}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                }} />
                        </div>
                        <div className="mb-5">
                            <Input
                                crossOrigin="anonymous"
                                label="Password"
                                color="red"
                                {...register("password", {
                                    required: true,
                                })}
                                error={errors.code ? true : false}
                                type="password" />
                        </div>
                        <div className="mt-6">
                            <button
                                className="bg-main w-full uppercase font-semibold py-3 text-white rounded-md text-sm relative"
                                type="submit"
                                disabled={fetching}>
                                Reset Password
                                <div className="absolute top-1/2 -translate-y-1/2 right-5">
                                    {fetching &&
                                        <div
                                            className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                                    }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default ResetForm;