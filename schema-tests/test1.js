const Ajv = require('ajv')
const ajv = new Ajv({ allErrors: true }) // options can be passed, e.g. {allErrors: true}
require('ajv-errors')(ajv /*, {singleError: true} */)
// const localize = require('ajv-i18n')

const schema = {
    type: 'object',
    properties: {
        foo: { type: 'integer' },
        bar: {
            type: 'string',
            minLength: 10,
            errorMessage: {
                type: '必须是字符串23333',
                minLength: '替换原有错误信息5555555',
            },
        },
    },
    additionalProperties: false,

}

const validate = ajv.compile(schema)

const data = {
    foo: 12,
    bar: 3333,
}

const valid = validate(data)

if (!valid) {
    console.log(validate.errors)
    // localize.zh(validate.errors)

    // console.log(ajv.errorsText(validate.errors, { separator: '\n' }))
}
