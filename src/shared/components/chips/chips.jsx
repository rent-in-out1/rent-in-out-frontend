import { cva } from 'class-variance-authority';
import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import CheckMark from '../../../assets/icons/checkMark';
import { cn } from '../../../util/functions';

const chipVariants = cva(
  'text-xs rounded-full cursor-pointer transition duration-300 flex items-center',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 border border-blue-700 text-white hover:bg-blue-700',
        unFill: `border border-neutral-200 hover:bg-neutral-200 active:bg-neutral-200`,
        ghost: 'border border-blue-300',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-2 py-1 rounded-md',
        lg: 'h-11 px-4 py-2 rounded-md'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    },
  }
);

const Chips = ({ chipsProp, setChipsProp, className, variant, size, ...props }) => {
  const [arrSlice1, setArrSlice1] = useState([]);
  const [arrSlice2, setArrSlice2] = useState([]);
  const [isOpenMoreOptions, setIsOpenMoreOptions] = useState(false);

  useEffect(() => {
    setArrSlice1(chipsProp.slice(0, 5));
    setArrSlice2(chipsProp.slice(5));
  }, [chipsProp]);

  const handleChecked = (id) => {
    const tempChips = arrSlice1.map((chip) => {
      if (chip._id === id)
        return { ...chip, check: !chip.check };
      return chip;
    });

    setArrSlice1(tempChips);
  };

  const moveToFirstGroup = (id) => {
    handleChecked(id);
    let ChoosenChip = {};
    const filterChips = arrSlice2.filter(chip => {
      if (chip._id === id) {
        ChoosenChip = chip;
        chip.check = true;
        return false;
      }
      return true;
    });
    setArrSlice2(filterChips);
    setArrSlice1(prev => [...prev, ChoosenChip]);
  };

  return (
    <div className='flex flex-wrap gap-1'>
      {
        arrSlice1 && arrSlice1.map((chip, i) => {
          return (
            <div key={i}>
              {
                chip.name && (
                  <div onClick={() => handleChecked(chip._id)} data-tooltip-id={`chip-${chip.name}`} className={`${cn(chipVariants({ size, variant, className }))} ${chip.check ? 'bg-neutral-200' : ''}`} {...props}>
                    {chip.check && <span className='mr-1'><CheckMark color='green' /></span>}
                    {chip.name}
                  </div>
                )
              }

              {chip.info &&
                <ReactTooltip
                  id={`chip-${chip.name}`}
                  place="top"
                  variant='dark'
                  content={chip.info}
                />}
            </div>
          );
        })
      }
      {/* add more chips */}
      <div onClick={() => setIsOpenMoreOptions(prev => !prev)} className={`${cn(chipVariants({ size, variant, className }))} relative inline-block select-none`} {...props}>
        Choose another ..

        {/* more options */}
        {isOpenMoreOptions && <div onClick={(e) => {
          e.stopPropagation();
          setIsOpenMoreOptions(true);
        }} className='absolute bottom-6 -left-4 cursor-default'>
          <div className='flex flex-wrap gap-1 m-4 w-56 md:w-72 h-auto max-h-36 md:max-h-48 overflow-y-auto z-50 p-2 rounded-sm bg-white shadow-2xl'>
            {
              arrSlice2 && arrSlice2.map((chip, i) => {
                return (
                  <div key={i}>
                    {
                      chip.name && (
                        <div onClick={() => moveToFirstGroup(chip._id)} className={`${cn(chipVariants({ size, variant, className }))} border-black`} {...props}>
                          {chip.name}
                        </div>
                      )
                    }
                  </div>
                );
              })}
          </div>
        </div>
        }
      </div>


    </div >
  );
};

export default Chips;