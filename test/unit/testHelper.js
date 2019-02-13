const same = (when, then) => {
    return when[then];
}
const testHelper = ({
    given,
    when,
    then
}) => {
    test(`${given}`, (when, then) => {
        same(when, then);
    })
}

export {testHelper};