//Components
import Layout from "@/Layout";
import Settings from "@/Components/Shop/Settings";

//Urql
import { initUrqlClient } from "@/Urql/client";
import { GET_PROFILE } from "@/Urql/Query/Authentication/auth.query";
import { GET_SELLER_PROFILE } from "@/Urql/Query/Authentication/profile.query";

const ShopSettings = () => {
    return (
        <Layout title="Shop-Settings" active="shop">
            <Settings />
        </Layout>
    );
};

export default ShopSettings;

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

    //Props
    return { props: { urqlState: ssrCache?.extractData() } };
}