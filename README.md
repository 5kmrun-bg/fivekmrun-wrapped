# Yearly update 
Run the following command to update the event data for the past year:

### Step 1: Run the update script
```
npm run update-data
```

### Step 2: Verify the changes
Check that the following changes have been made:
- new data files are created in `src/scripts` prefixed with `{YEAR}-`
- the new participation data files are copied in `src/api/data` 
- the constant `YEAR` in `src/api/constants.ts` is updated to the current year

### Step 3:
Create a PR and merge to `main` 
