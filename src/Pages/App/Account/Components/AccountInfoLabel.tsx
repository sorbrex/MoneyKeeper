import React from 'react';

export default function AccountInfoLabel (props:{content:string, type:string, editable?:boolean}) {
	return <input type={props.type} value={props.content} className="
		bg-softBlack rounded-lg p-2.5 m-2.5 md:m-5
		min-w-[300px] md:min-w-[200px] lg:min-w-[300px]
		text-white
	" disabled={!props.editable} />
};
