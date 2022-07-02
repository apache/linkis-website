let body = process.env['INPUT_PRBODY'];

let pattern = /#\d+/;

let issueNumber = body.match(pattern)[0].replace('#', '');

console.log(`::set-output name=issueNumber::${issueNumber}`);
