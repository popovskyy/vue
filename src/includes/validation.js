import { Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure } from 'vee-validate';
import {
    required,
    min,
    max,
    alpha_spaces as alphaSpaces,
    email,
    min_value as minVal,
    max_value as maxVal,
    confirmed,
    not_one_of
} from '@vee-validate/rules';

export default {
    install(app) {
        app.component('VeeForm', VeeForm);
        app.component('VeeField', VeeField);
        app.component('ErrorMessage', ErrorMessage);

        defineRule('required', required);
        defineRule('tos', required);
        defineRule('min', min);
        defineRule('max', max);
        defineRule('alpha_spaces', alphaSpaces);
        defineRule('email', email);
        defineRule('min_value', minVal);
        defineRule('max_value', maxVal);
        defineRule('password_mismatch', confirmed);
        defineRule('not_one_of', not_one_of);
        defineRule('country_excluded', not_one_of);

        configure({
            generateMessage: (ctx) => {
                const messages = {
                    required: `The field ${ctx.field} is required.`,
                    min: `The field ${ctx.field} is too short.`,
                    max: `The field ${ctx.field} is too short.`,
                    alpha_spaces: `The field ${ctx.field} may only contain alphabetical chars`,
                    email: `The field ${ctx.field} must be a valid email.`,
                    min_value: `The field ${ctx.field} is too low.`,
                    max_value: `The field ${ctx.field} is too high.`,
                    password_mismatch: `The password don't match.`,
                    not_one_of: `You are not arrowed to use this value for the field ${ctx.field}.`,
                    country_excluded: `Due to restrictions, we do not accept users from this location.`,
                    tos: `You must accept the Terms of Service.`
                };

                const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

                return message;
            },

            validateOnBlur: true, // it's default value  from vee-validation lib
            validateOnChange: true, // it's default value  from vee-validation lib
            validateOnInput: false, // it's default value  from vee-validation lib
            validateOnModelUpdate: true // it's default value  from vee-validation lib
        });
    }
};