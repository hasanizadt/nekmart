//Components
import Layout from "@/Layout";
import WithdrawHistory from "@/Components/Withdraw/WithdrawHistory";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";
import { GET_PREVIOUS_WITHDRAW } from "@/Urql/Query/Withdraw/withdraw.query";

const MoneyWithdraw = () => {
    return (
        <Layout title="Money Withdraw" active="money">
            <WithdrawHistory />
        </Layout>
    );
};

export default MoneyWithdraw;

export const getServerSideProps = async (ctx) => {
    //Urql
    const { client, ssrCache } = initUrqlClient();

    //Headers
    const fetchOptions = {
        headers: {
            cookie: ctx.req.headers.cookie
        }
    };

    //Queries
    const { data } = await client.query(GET_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    if (!data || data?.getProfile.role !== "seller") {
        return { redirect: { destination: "/login-to-seller", permanent: false } }
    }

    //--//
    await client.query(GET_SELLER_PROFILE, {}, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //--//
    await client.query(GET_PREVIOUS_WITHDRAW, { searchInput: { page: 1, limit: 20 } }, {
        fetchOptions,
        requestPolicy: "network-only"
    }).toPromise();

    //Props
    return { props: { urqlState: ssrCache?.extractData() } };
}