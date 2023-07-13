const Display = ({ filter, persons }) => {
    return(
        filter ? (
            <ul>
              {
                persons
                  .filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
                  .map(person => <li key={person.name}>{person.name} {person.number}</li>)
              }
            </ul>
          ) : (
            <ul>
              {
                persons
                  .map(person => <li key={person.name}>{person.name} {person.number}</li>)
              }
            </ul>
            )
    )
}

export default Display