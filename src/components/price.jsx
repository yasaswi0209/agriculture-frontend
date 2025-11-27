const Price = ({ value }) => {
  return (
    <span style={{ fontWeight: "600" }}>
      ₹{Number(value).toLocaleString("en-IN")}
    </span>
  );
};

export default Price;
