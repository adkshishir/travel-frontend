'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Sample search suggestions
const SAMPLE_SUGGESTIONS = [
  'React hooks tutorial',
  'Next.js documentation',
  'Tailwind CSS examples',
  'TypeScript best practices',
  'Responsive design patterns',
  'Server components in Next.js',
  'Web accessibility guidelines',
];

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on query with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === '') {
        setSuggestions([]);
        return;
      }

      const filtered = SAMPLE_SUGGESTIONS.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      setQuery(suggestions[selectedIndex]);
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    }
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching for: ${query}`);
      // In a real app, you would call your search API here
    }
  };

  // Clear search input
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative w-full bg-white rounded-md'>
      <form onSubmit={handleSubmit} className='relative'>
        <div className='relative'>
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
              isFocused ? 'text-primary' : 'text-muted-foreground'
            }`}
          />

          <Input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder='Search anything...'
            className={`pl-10 pr-10 py-6  transition-all ${
              isFocused ? 'ring-2 ring-primary ' : ''
            }`}
          />

          {query && (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={clearSearch}
              className='absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full '>
              <X className='h-4 w-4' />
              <span className='sr-only'>Clear search</span>
            </Button>
          )}

          <Button
            type='submit'
            size='icon'
            variant={'default'}
            className='absolute bg-primary right-1 cursor-pointer  top-1/2 -translate-y-1/2 rounded-full h-8 w-8'>
            <ArrowRight className='h-4 w-4' />
            <span className='sr-only'>Search</span>
          </Button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && isFocused && (
        <div
          ref={suggestionsRef}
          className='absolute z-10 mt-1 w-full bg-background border rounded-lg shadow-lg overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100'>
          <ul className='py-1'>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <Button
                  type='button'
                  variant={'ghost'}
                  className={`w-full justify-start text-left px-4 py-2 text-sm hover:bg-muted flex items-center ${
                    index === selectedIndex ? 'bg-muted' : ''
                  }`}
                  onClick={() => {
                    setQuery(suggestion);
                    setSuggestions([]);
                    setSelectedIndex(-1);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}>
                  <Search className='h-3 w-3 mr-2 text-muted-foreground' />
                  {suggestion}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
