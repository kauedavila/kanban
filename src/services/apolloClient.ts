import { ApolloClient, InMemoryCache } from "@apollo/client";

const serviceApolloClient = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_GQL_URL}/?populate=*`,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

export default serviceApolloClient;
