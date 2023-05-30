import * as $ from "jquery";
import Model from "./models/model";

export function validateForm<T extends Model>(
  formElement: HTMLFormElement,
  model?: T
): T | undefined {
  let formValid = true;
  const $formInputs = $(formElement).find("input, select, textarea");
  $formInputs.each((index, input) => {
    const $input = $(input);
    const inputName = $input.attr("name");
    if (!$input.val()) {
      $input.addClass("is-invalid");
      formValid = false;
    } else {
      $input.removeClass("is-invalid");
      $input.addClass("is-valid");
      if (inputName && model && Object.keys(model).includes(inputName)) {
        (model as Model)[inputName] = $input.val();
      }
    }
  });
  if (!formValid) {
    throw new Error("Form is not valid");
  }
  return model;
}
