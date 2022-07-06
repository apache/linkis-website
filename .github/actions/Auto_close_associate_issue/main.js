let body = process.env['INPUT_PRBODY'];

let pattern = /#\d+/;

let issueNumber;

try {
    issueNumber = body.match(pattern)[0].replace('#', '');
} catch{
    issueNumber = -1;
}


console.log(`::set-output name=issueNumber::${issueNumber}`);

