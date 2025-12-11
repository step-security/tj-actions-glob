[![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge\&logo=ubuntu\&logoColor=white)](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on)
[![Mac OS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge\&logo=macos\&logoColor=F0F0F0)](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on)
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge\&logo=windows\&logoColor=white)](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on)

[![build-test](https://github.com/step-security/tj-actions-glob/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/step-security/tj-actions-glob/actions/workflows/test.yml)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

<!-- ALL-CONTRIBUTORS-BADGE:END -->

## glob

Search for files matching [glob patterns](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet) with support for returning matching deleted git tracked files, omits files and directories specified in the projects `.gitignore`, and excludes the `.git` and `node_modules` folders except explicitly specified.

## Table of Contents

*   [Usage](#usage)
*   [Inputs](#inputs)
*   [Outputs](#outputs)
*   [Path filtering](#path-filtering)
    *   [minimatch options](#minimatch-options)
        *   [Enabled](#enabled)
        *   [Optionally enabled](#optionally-enabled)
        *   [Disabled](#disabled)
    *   [Pattern Gotcha](#pattern-gotcha)
*   [Patterns](#patterns)
    *   [Glob behaviour](#glob-behaviour)
    *   [Tilde expansion](#tilde-expansion)
    *   [Comments](#comments)
    *   [Exclude patterns](#exclude-patterns)
    *   [Escaping](#escaping)
*   [Credits](#credits)
*   [Report Bugs](#report-bugs)
*   [Contributors ✨](#contributors-)

## Usage

> \[!WARNING]
>
> *   Ensure that subdirectory patterns are prefixed with `**/` as `**.yml` only matches yml files in the top level directory and should be replaced with `**/*.yml`.
> *   All multi-line string patterns are specified without quotes. See: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet for more examples of filter patterns

```yaml
...
    steps:
      - uses: actions/checkout@v6

      - name: Glob match
        uses: step-security/tj-actions-glob@v22
        id: glob
        with:
          files: |
            *.md
            **/*.yaml
            !action.yml
            **/rebase.yml

      - name: Show all matching files
        run: |
          echo "${{ steps.glob.outputs.paths }}"
        # Outputs: .github/workflows/rebase.yml .github/workflows/sync-release-version.yml .github/workflows/test.yml...
```

## Inputs

<!-- AUTO-DOC-INPUT:START - Do not remove or modify this section -->

```yaml
- uses: step-security/tj-actions-glob@v22
  id: glob
  with:
    # Specify a base ref used 
    # for comparing changes, when `include-deleted-files` 
    # is set to `true` 
    # Type: string
    # Default: "${{ github.event.pull_request.base.ref }}"
    base-ref: ''

    # Specify a base commit SHA 
    # used for comparing changes, when 
    # `include-deleted-files` is set to `true` 
    # Type: string
    base-sha: ''

    # Specify a diff string `..` 
    # or `...` used for comparing 
    # changes, when `include-deleted-files` is set 
    # to `true` 
    # Type: string
    diff: ''

    # Excluded file patterns (optionally include `!` before the file pattern or it would be prepended) 
    # Type: string
    excluded-files: ''

    # Source file to populate the 
    # `excluded-files` input 
    # Type: string
    excluded-files-from-source-file: ''

    # Separator used to split the 
    # `excluded-files-from-source-file` input 
    # Type: string
    # Default: "\n"
    excluded-files-from-source-file-separator: ''

    # Separator used to split the 
    # `excluded-files` input 
    # Type: string
    # Default: "\n"
    excluded-files-separator: ''

    # File patterns
    # Type: string
    files: ''

    # Source file to populate the 
    # `files` input 
    # Type: string
    files-from-source-file: ''

    # Separator used to split the 
    # `files-from-source-file` input 
    # Type: string
    # Default: "\n"
    files-from-source-file-separator: ''

    # Separator used to split the 
    # `files` input 
    # Type: string
    # Default: "\n"
    files-separator: ''

    # Indicates whether to follow symbolic 
    # links 
    # Type: boolean
    # Default: "true"
    follow-symbolic-links: ''

    # Specify a boolean indicating a 
    # PR from a fork is 
    # used for comparing changes, when 
    # `include-deleted-files` is set to `true` 
    # Type: string
    # Default: "${{ github.event.pull_request.head.repo.fork }}"
    head-repo-fork: ''

    # Include all matching deleted files
    # Type: boolean
    # Default: "false"
    include-deleted-files: ''

    # Indicates whether to include matched 
    # directories 
    # Type: boolean
    # Default: "true"
    match-directories: ''

    # Indicates whether to match files 
    # in `.gitignore` 
    # Type: boolean
    # Default: "false"
    match-gitignore-files: ''

    # Indicates whether to read `.gitignore`. 
    # The `.gitignore` file will be 
    # ignored if set to `false`. 
    # Overrides `match-gitignore-files` 
    # Type: boolean
    # Default: "true"
    read-gitignore: ''

    # Escape special characters of filenames 
    # used in the `paths` output 
    # Type: boolean
    # Default: "true"
    safe-output: ''

    # Separator used for the paths 
    # output. 
    # Type: string
    # Default: " "
    separator: ''

    # Specify a current commit SHA 
    # used for comparing changes, when 
    # `include-deleted-files` is set to `true` 
    # Type: string
    # Default: "${{ github.sha }}"
    sha: ''

    # Strip the `$GITHUB_WORKSPACE` from the 
    # `paths` output 
    # Type: boolean
    # Default: "true"
    strip-top-level-dir: ''

    # Provide a path that is 
    # relative to `$GITHUB_WORKSPACE` for identifying 
    # the repository. 
    # Type: string
    # Default: "."
    working-directory: ''

```

<!-- AUTO-DOC-INPUT:END -->

## Outputs

<!-- AUTO-DOC-OUTPUT:START - Do not remove or modify this section -->

|                                           OUTPUT                                            |  TYPE  |                                              DESCRIPTION                                              |
|---------------------------------------------------------------------------------------------|--------|-------------------------------------------------------------------------------------------------------|
| <a name="output_has-custom-patterns"></a>[has-custom-patterns](#output_has-custom-patterns) | string |                       Indicates whether at least one <br>pattern was provided                         |
|                      <a name="output_paths"></a>[paths](#output_paths)                      | string |                List of filtered paths using <br>the specified patterns and separator                  |
|    <a name="output_paths-output-file"></a>[paths-output-file](#output_paths-output-file)    | string | List of filtered paths using <br>the specified patterns and separator <br>stored in a temporary file  |

<!-- AUTO-DOC-OUTPUT:END -->

## Path filtering

File and Directory patterns are evaluted using [minimatch](https://github.com/isaacs/minimatch) with the help of the [@actions/glob](https://github.com/actions/toolkit/tree/main/packages/glob) package.

### [minimatch options](https://github.com/isaacs/minimatch#options)

#### Enabled

*   [dot](https://github.com/isaacs/minimatch#dot)
*   [nocomment](https://github.com/isaacs/minimatch#nocomment)
*   [noext](https://github.com/isaacs/minimatch#noext)
*   [nonegate](https://github.com/isaacs/minimatch#nonegate): This is handled by the [@actions/glob](https://github.com/actions/toolkit/tree/main/packages/glob) package.

#### Optionally enabled

*   [nocase](https://github.com/isaacs/minimatch#nobrace): Enabled for windows

#### Disabled

*   [nobrace](https://github.com/isaacs/minimatch#nobrace): Ensures that brace or brace sets can be used.

### Pattern Gotcha

The `**` pattern in [minimatch](https://github.com/isaacs/minimatch) matches any number of directories and files recursively, but it must be followed by a directory separator (`/` on Unix-like systems) to be effective. If you want to match all files with the `.js` extension in a directory and its subdirectories, you should use the `**/*.js` pattern as opposed to `**.js`

## Patterns

### Glob behaviour

Patterns `*`, `?`, `[...]`, and `**` (globstar) are supported.

With the following behaviours:

*   File names that begin with `.` may be included in the results
*   Case insensitive on Windows
*   Directory separators `/` and `\` are both supported on Windows

### Tilde expansion

Supports basic tilde expansion, for current user HOME replacement only.

Example:

*   `~` may expand to /Users/johndoe
*   `~/foo` may expand to /Users/johndoe/foo

### Comments

Patterns that begin with `#` are treated as comments.

### Exclude patterns

Leading `!` changes the meaning of an include pattern to exclude.

Multiple leading `!` flips the meaning.

### Escaping

Wrapping special characters in `[]` can be used to escape literal glob characters
in a file name. For example the literal file name `hello[a-z]` can be escaped as `hello[[]a-z]`.

On Linux/macOS `\` is also treated as an escape character.