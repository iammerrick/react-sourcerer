# react-sourcerer

This project allows you to express code patterns in the form of React components. 

This is a very experimental project. Currently, this project is under heavy development but a lot can be understood from the [tests](modules).

# Example

For example the following will match code that:

1. Imports from 'lodash'
2. Calls forEach on any identifier imported from lodash.

```javascript
<Import
  source='lodash'
>
{imports => 
  <MemberExpression
    name='forEach'
    target={getIdentifiersFromImport(imports)}
  >
    {(matches) => 
      matches.length > 0
        ? <UseES2015Each />
        : null}
  </MemberExpression>

}
</Import>
```

Of course the patterns can be as sophisticated as you'd like them to be, and because React is awesome you can even observe changes in the code (componentDidUpdate). 
