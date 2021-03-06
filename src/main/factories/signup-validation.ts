import {RequiredFieldValidation} from '../../presentation/helpers/validators/required-field-validation';
import {ValidationComposite} from '../../presentation/helpers/validators/validation-composite';
import {Validation} from '../../presentation/helpers/validators/validator';

export const makeSignUpValidation = (): Validation => {
  const validations: Validation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
