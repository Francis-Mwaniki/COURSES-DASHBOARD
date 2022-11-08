import {
  Form as veeForm,
  Field as veeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  confirmed,
  min_value as minVal,
  max_value as maxVal,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("veeForm", veeForm);
    app.component("veeField", veeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);

    defineRule("max", max);

    defineRule("alpha_spaces", alphaSpaces);

    defineRule("email", email);

    defineRule("confirmed", confirmed);

    defineRule("min_value", minVal);

    defineRule("max_value", maxVal);

    configure({
      generateMessage: (ctx) => {
        const msgs = {
          required: `The field ${ctx.field} is required`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `This field ${ctx.field} may only contain characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          confirmed: `The passwords do not match `,
          min_value: `Sorry kiddoh! At your ${ctx.field} we cant be responsible for your character development`,
          max_value: `${ctx.field} must be less than ${ctx.value}`,
        };

        const msg = msgs[ctx.rule.name]
          ? msgs[ctx.rule.name]
          : `The field ${ctx.field} is invalid`;
        return msg;
      },

      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
