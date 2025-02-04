const Home = async () => {
  return (
    <main className="container mx-auto h-dvh flex items-center justify-center flex-col">
      <h2 className="text-2xl lg:text-5xl font-sans font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
        Notes GPT
      </h2>
      <p className="text-center">
        The perfect mixture of AI and education to better assist the learners.
      </p>
      <code className="text-center mt-4 text-lime-300">
        Click the arrow icon and start a new chat! Happy Learning!
      </code>
    </main>
  );
};

export default Home;
