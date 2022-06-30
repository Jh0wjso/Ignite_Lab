import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl51jspoy1p6r01uk8nh38ip8/master',
    cache: new InMemoryCache()
})