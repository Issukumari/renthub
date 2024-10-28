import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function OnlyLettersValidator():ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null=>{
        const value = control.value;
        const isValid = /^[a-z A-Z]+$/.test(value)
        return isValid?null:{onlyLetters:true};
    }

}