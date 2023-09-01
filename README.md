# NgxSimpleDatepicker

NgxSimpleDatePicker is a custom FormControl with validation, which
uses [vanillajs-datepicker](https://github.com/mymth/vanillajs-datepicker) for the selection by calendar part, and which
uses [angular2-text-mask](https://github.com/text-mask/text-mask/tree/master/angular2) for the free input part,
witch [text-mask-addons](https://github.com/text-mask/text-mask/tree/master/addons)

## Installation

1. Firt of all, you need to install:
- [vanillajs-datepicker](https://www.npmjs.com/package/vanillajs-datepicker)
  - `yarn add vanillajs-datepicker@^1.2.0` or `npm install --save vanillajs-datepicker@^1.2.0`
  - `yarn add -D @types/vanillajs-datepicker@^1.2.1`
- [angular2-text-mask](https://www.npmjs.com/package/angular2-text-mask)
  - `yarn add angular2-text-mask@^9.0.0` or `npm install --save angular2-text-mask@^9.0.0`
- [text-mask-addons](https://www.npmjs.com/package/text-mask-addons)
  - `yarn add text-mask-addons@^3.8.0` or `npm install --save text-mask-addons@^3.8.0`
- [luxon](https://www.npmjs.com/package/luxon)
  - `yarn add luxon@^3.2.1` or `npm install --save luxon@^3.2.1`
  - `yarn add -D @types/luxon@^3.2.1`

Or in one time:
- `yarn add vanillajs-datepicker@^1.2.0 angular2-text-mask@^9.0.0 text-mask-addons@^3.8.0 luxon@^3.0.1`
- `yarn add -D @types/vanillajs-datepicker@^1.2.1 @types/luxon@^3.0.0`

2. Then you need to install the package:
```bash
npm install --save @nolanroose/ngx-simple-datepicker
```

or

```bash
yarn add @nolanroose/ngx-simple-datepicker
```

Add to your main style file (`style.scss`):

```scss
@import "~@nolanroose/ngx-simple-datepicker/assets/styles/default-theme";
```

## Usage

in your component:

```ts
export class AppComponent implements OnInit {
  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('')
    });
  }
}
```

in your template:

```html 
<form [formGroup]="form">
    <ngx-simple-datepicker
      [form]="form"
      [inputKey]="'date'"
      [placeholder]="'test'"
      [formGlobalError]="false"
      [formControlName]="'date'"
      [id]="'date'"
    ></ngx-simple-datepicker>
</form>
```

example with default theme:

<img width="529" alt="example" src="https://user-images.githubusercontent.com/14938257/180854155-370c8a3e-e94d-4c5e-88b5-580853553af0.png">

## Theming

Copy the variable file from 
`~@nolanroose/ngx-simple-datepicker/assets/styles/_variables.scss`

Paste it into your custom variable themes (`custom-datepicker-theme.scss`), change the variables.

Import the variable file before the import of default theme:
```scss
@import "custom-datepicker-theme.scss";
@import "~@nolanroose/ngx-simple-datepicker/assets/styles/default-theme";
```

## Internationalization

For the moment, the datepicker is only internationalized for the French, English, Spanish languages.

## Test locally

- clone this repository
- `yarn install`
- `yarn run build:lib:dev`
- `yarn run start`

## Roadmap

- [ ] Add internationalization
- [x] Add tests
- [ ] Add more documentation
- [ ] Add configuration service
- [ ] Add contributions guidelines
- [ ] Add real ci cd pipeline

