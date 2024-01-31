import './App.css'
import { RAW_DATA } from './mock';
import { convertDoctypeToNodes, convertToIDoctype } from './presenters';
import { FaSquare, FaCheckSquare, FaMinusSquare } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";

const doctypes = convertToIDoctype(RAW_DATA);
const nodes = {
  name: "",
  metadata: {key: 'all'},
  children: convertDoctypeToNodes(doctypes),
};

const data = flattenTree(nodes);
console.log('@data', data)
export const App = () => {

  return (
    <>
      <h1>Checkboxes</h1>
      <div>
        <div className="checkbox">
          <TreeView
            data={data}
            aria-label="Checkbox tree"
            multiSelect
            propagateSelect
            propagateSelectUpwards
            togglableSelect
            onSelect={(evt) => {
              // console.log(evt)
              // setSelectedIds(evt.treeState.selectedIds);
            }}
            nodeRenderer={({
              element,
              isBranch,
              isExpanded,
              isSelected,
              isHalfSelected,
              getNodeProps,
              level,
              handleSelect,
              handleExpand,
            }) => {
              return (
                <div
                  {...getNodeProps({ onClick: handleExpand })}
                  style={{ marginLeft: 40 * (level - 2) }}
                >
                  {isBranch && <ArrowIcon isOpen={isExpanded} />}
                  <CheckBoxIcon
                    className="checkbox-icon"
                    onClick={(e) => {
                      handleSelect(e);
                      e.stopPropagation();
                    }}
                    variant={
                      isHalfSelected ? "some" : isSelected ? "all" : "none"
                    }
                  />
                  <span className="name">{element.name}</span>
                </div>
              );
            }}
          />
        </div>
        <button>Submit</button>
      </div>
    </>
  )
}

const ArrowIcon = ({ isOpen, className }) => {
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

const CheckBoxIcon = ({ variant, ...rest }) => {
  switch (variant) {
    case "all":
      return <FaCheckSquare {...rest} />;
    case "none":
      return <FaSquare {...rest} />;
    case "some":
      return <FaMinusSquare {...rest} />;
    default:
      return null;
  }
};

