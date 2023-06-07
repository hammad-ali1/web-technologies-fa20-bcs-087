import mongoose, { Schema } from "mongoose";

const FormSchema = new Schema<ModelTypes.Form>({
  field1: { type: String, required: true },
  field2: { type: String, required: true },
});

const Form = mongoose.model("Form", FormSchema);

export default Form;
