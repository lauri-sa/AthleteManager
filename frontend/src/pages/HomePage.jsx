const HomePage = () => {
  return (
    <section className="h-100 text-center" aria-label="App description">
      <div className="container-fluid h-100 d-flex">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6">
            <h1>Welcome</h1>
            <br/>
            <p className="fs-5">
              Athlete Manager is a tool designed to help you track and manage
              athletes, their sports, and their achievements. With an
              easy-to-use interface, you can create athlete profiles, log
              achievements, and update information as needed. Whether you’re
              managing a small team or a larger group of athletes, this app
              allows you to keep all their data organized in one place. Explore
              the features and start building your athlete database today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
