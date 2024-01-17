'use client';
import React, { useState } from 'react';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

interface SearchBarProps {
	searchedText: string;
	setSearchedText: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const { searchedText, setSearchedText } = props;
	return (
		<div className="flex justify-center items-center ">
			<div className="relative bg-white/30 backdrop-blur-lg rounded-full border border-gray-200 p-2 w-96 flex items-center">
				<input
					type="text"
					className="bg-transparent outline-none w-full text-black placeholder-gray-500 pl-4"
					placeholder="Search..."
					value={searchedText}
					onChange={(e) => setSearchedText(e.target.value)}
				/>
				{searchedText && (
					<AiOutlineClose
						className="text-gray-500 mr-3 cursor-pointer"
						onClick={() => setSearchedText('')}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
