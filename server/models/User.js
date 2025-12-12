import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String, // W prawdziwej aplikacji hasła powinny być hashouje (np. argon2/bcrypt), ale tutaj zostawiamy plain text zgodnie z poprzednią implementacją
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password; // Nie zwracamy hasła
      },
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const User = mongoose.model("User", userSchema);
