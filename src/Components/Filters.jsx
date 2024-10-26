const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="">Filter by trip expenses</label>
          <select
            name=""
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">--All Categories--</option>
            <option value="airfare">Airfare</option>
            <option value="lodging">Lodging</option>
            <option value="activities">Activities</option>
            <option value="food">Food</option>
            <option value="transportation">Transportation</option>
            <option value="miscellaneous">Miscellaneous Expenses</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
