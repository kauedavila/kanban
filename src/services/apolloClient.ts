import { ApolloClient, InMemoryCache } from "@apollo/client";

const serviceApolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
  },
});

export default serviceApolloClient;
