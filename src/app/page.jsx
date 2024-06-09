import ApolloProviderClient from './components/ApolloProviderClient';
import HomePage from './components/HomePage';

const Page = () => {
  return (
    <ApolloProviderClient>
      <HomePage />
    </ApolloProviderClient>
  );
};

export default Page;
