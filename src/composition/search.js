import { ref, toRefs, reactive } from "@vue/composition-api";
import serverFetch from "./server-fetch";
export default function () {
    let breweries = reactive({ list: [], error: null, fetching: false });
    const val = ref('');
    const submitted = async () => {
        const { response, error, fetchData, fetching } = serverFetch(
            `http://localhost:3000/?artistName=${val.value}`,
            {}
        );
        fetchData();
        breweries.list = response;
        breweries.error = error;
        breweries.fetching = fetching;
    };
    return { submitted, ...toRefs(breweries), val };
}
