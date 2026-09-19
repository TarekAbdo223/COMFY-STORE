const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control items-center grid justify-items-center">
      <label htmlFor={name} className="label cursor-pointer mb-2">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
};

export default FormCheckbox;
