function Home() {
  return (
    <Card
      bgcolor="success"
      txtcolor="white"
      header="BadBank"
      title="Welcome to BadBank!"
      text="The Most Hackable Bank on Earth"
      body={
        <>
          <img
            src="bank.png"
            style={{ padding: "20px" }}
            className="img-fluid"
            alt="Banking picture"
          />
          <br />
        </>
      }
    />
  );
}
