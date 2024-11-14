import { useState } from "react";

export function useForm(initialData, onValidate) {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    // const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return {
    form,
    errors,
    loading,
    setForm,
    setLoading,
    setErrors,
    handleChange,
  };
}
