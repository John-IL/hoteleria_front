import { extend } from "vee-validate";
import {
  email,
  length,
  max,
  min,
  min_value,
  required,
} from "vee-validate/dist/rules";
import RoomService from "@/views/main/views/room/services/room.service";

extend("secret", {
  validate: (value) => value === "example",
  message: "This is not the magic word",
});
extend("title-required", {
  validate(value) {
    return !!value.title;
  },
  message: "Title is required",
});
extend("length", {
  ...length,
  message: "is length",
});
extend("min_value", {
  ...min_value,
  message: "is min",
});
extend("min", {
  ...min,
  message: "is min",
});
extend("valid-document", {
  validate: (value) => value.length == 11 || value.length == 0,
  message: "Please enter a valid Document",
});
extend("max", {
  ...max,
  message: "is max",
});
extend("required", {
  ...required,
  message: "es requerido",
});
extend("email", {
  ...email,
  message: "This field must be a valid email",
});
extend("chat-compose-required", {
  ...required,
  message: "{_field_} es requerido",
});
extend("mobile", {
  validate: (value) => value.length == 14,
  message: "This field must be a valid mobile number",
});

extend("validate-amount", {
  validate: (value) => value > 0,
  message: "The amount must be greater than 0.00",
});
extend("validate-amount-ce", {
  validate: (value) => value >= 30,
  message: "The amount must be at least 30.00",
});
extend("validate-amount-zero", {
  validate: (value) => value >= 0,
  message: "The amount must be greater or equal to 0.00",
});
extend("array", {
  validate: (value) => value.length > 0,
  message: "This field is required",
});
extend("boolean", {
  validate: (value) => value == true,
  message: "",
});
extend("validate-hours-92", {
  validate: (value) => value >= 92,
  message: "The minimum of hours is 92",
});
extend("money-1", {
  validate: (value) => value >= 1,
  message: "Required",
});

extend("money-2", {
  validate: (value) => value >= 1,
  message: "The amount must be greater than 0.00",
});
extend("money-required", {
  validate: (value) => value > 0,
  message: "Required",
});
extend("module-required", {
  validate: (obj) => obj.id !== 0,
  message: "Required",
});
extend("validate-spaces", {
  validate: (value) => value.replace(/\s/g, "") != "",
  message: "The field is required",
});
extend("password", {
  params: ["confirm"],
  validate(value, { confirm }) {
    return value === confirm;
  },
  message: "Password confirmation does not match",
});
extend("specialpassword", {
  validate: (value) => {
    const regularExpression =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regularExpression.test(value);
  },
  message: () => {
    return `
      <div>
        <span>La contraseña debe tener : </span>
        <ul>
          <li>Un mínimo de 8 caracteres</li>
          <li>Al menos una mayúscula</li>
          <li>Al menos una minúscula</li>
          <li>Al menos un número</li>
          <li>Al menos un caracter especial</li>
        </ul>
        <span>Ejemplo: Abcd1234@</span>
      </div>
    `;
  },
});
extend("specialemail", {
  validate: (value) => {
    const regularExpression = /^[a-zA-Z][-_.a-zA-Z0-9]{4,29}@alarcongroup.us$/;
    return regularExpression.test(value);
  },
  message: "is invalid. Example: xxxxx@alarcongroup.us",
});

extend("truthy", {
  validate: (value) => value === true,
  message: "Has to be true",
});

extend("required-tracking", {
  validate: (value) => value.length == 19,
  message: "Incorrect Track Number",
});

extend("validate-not-overflow", {
  params: ["balanceAmount"],

  validate: (value, { balanceAmount }) => value <= balanceAmount,
  message: (field, { balanceAmount }) => {
    return `The amount must be less than ${Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(balanceAmount)}`;
  },
});

extend("unique-room", {
  async validate(value) {
    const {data} = await RoomService.validateUniqueRoom({
      room: value,
    });
    return data[0].not_unique == 0;
  },
  message: "la habitacion ya existe",
});
