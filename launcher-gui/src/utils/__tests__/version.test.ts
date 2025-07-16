import { describe, it, expect } from 'vitest';
import { parseVersion, compareVersions, sortByVersion } from '../version';

describe('parseVersion', () => {
  it('parses simple version strings', () => {
    expect(parseVersion('1.2.3')).toEqual([1, 2, 3]);
    expect(parseVersion('10.0.0')).toEqual([10, 0, 0]);
    expect(parseVersion('0.1.0')).toEqual([0, 1, 0]);
  });

  it('handles versions with different segment counts', () => {
    expect(parseVersion('1.2')).toEqual([1, 2]);
    expect(parseVersion('1.2.3.4')).toEqual([1, 2, 3, 4]);
    expect(parseVersion('1')).toEqual([1]);
  });

  it('handles invalid segments as 0', () => {
    expect(parseVersion('1.a.3')).toEqual([1, 0, 3]);
    expect(parseVersion('x.y.z')).toEqual([0, 0, 0]);
    expect(parseVersion('')).toEqual([0]);
  });
});

describe('compareVersions', () => {
  it('correctly compares versions in descending order', () => {
    // Newer version should come first (negative result)
    expect(compareVersions('2.0.0', '1.0.0')).toBeLessThan(0);
    expect(compareVersions('1.2.0', '1.1.0')).toBeLessThan(0);
    expect(compareVersions('1.0.2', '1.0.1')).toBeLessThan(0);
  });

  it('correctly identifies equal versions', () => {
    expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
    expect(compareVersions('2.5.3', '2.5.3')).toBe(0);
  });

  it('correctly compares versions with different segment counts', () => {
    expect(compareVersions('2.0', '1.9.9')).toBeLessThan(0);
    expect(compareVersions('1.0.0', '1.0')).toBe(0);
    expect(compareVersions('1.2.3.4', '1.2.3')).toBeLessThan(0);
  });

  it('handles edge cases', () => {
    expect(compareVersions('10.0.0', '9.9.9')).toBeLessThan(0);
    expect(compareVersions('1.10.0', '1.9.0')).toBeLessThan(0);
    expect(compareVersions('0.0.1', '0.0.0')).toBeLessThan(0);
  });
});

describe('sortByVersion', () => {
  it('sorts versions in descending order', () => {
    const versions = [
      { version: '1.0.0', name: 'v1' },
      { version: '2.0.0', name: 'v2' },
      { version: '1.5.0', name: 'v1.5' },
      { version: '1.0.1', name: 'v1.0.1' },
    ];

    const sorted = sortByVersion(versions);

    expect(sorted.map(v => v.version)).toEqual(['2.0.0', '1.5.0', '1.0.1', '1.0.0']);
  });

  it('preserves original array', () => {
    const versions = [{ version: '1.0.0' }, { version: '2.0.0' }];

    const sorted = sortByVersion(versions);

    expect(sorted).not.toBe(versions);
    expect(versions[0].version).toBe('1.0.0'); // Original unchanged
  });

  it('handles empty arrays', () => {
    expect(sortByVersion([])).toEqual([]);
  });

  it('handles single item arrays', () => {
    const versions = [{ version: '1.0.0' }];
    expect(sortByVersion(versions)).toEqual([{ version: '1.0.0' }]);
  });

  it('handles complex version numbers', () => {
    const versions = [{ version: '1.0.0-alpha' }, { version: '1.0.0' }, { version: '0.9.9' }, { version: '2.0.0-beta.1' }];

    const sorted = sortByVersion(versions);

    // Note: Our simple parser doesn't handle pre-release versions specially
    // It will parse '1.0.0-alpha' as '1.0.0'
    expect(sorted[0].version).toBe('2.0.0-beta.1');
    expect(sorted[sorted.length - 1].version).toBe('0.9.9');
  });
});
