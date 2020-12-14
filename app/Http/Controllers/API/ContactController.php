<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Http\Requests\ContactRequest;
use App\Http\Resources\Contact as ContactResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    /**
     * Get list of contacts
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return ContactResource::collection(
            Contact::latest()->paginate(request()->input('limit', 10))
        );
    }

    /**
     * Save contact
     *
     * @param ContactRequest $request
     * @return ContactResource
     */
    public function store(ContactRequest $request): ContactResource
    {
        return new ContactResource(
            Contact::create($request->only([
                'first_name',
                'last_name',
                'phone',
                'email',
                'birthday',
                'gender'
            ]))
        );
    }

    /**
     * Get single contact
     *
     * @param Contact $contact
     * @return ContactResource
     */
    public function show(Contact $contact): ContactResource
    {
        return new ContactResource($contact);
    }

    /**
     * Update contact
     *
     * @param ContactRequest $request
     * @param Contact $contact
     * @return ContactResource
     */
    public function update(ContactRequest $request, Contact $contact): ContactResource
    {
        $contact->update($request->only([
            'first_name',
            'last_name',
            'phone',
            'email',
            'birthday',
            'gender'
        ]));

        return new ContactResource($contact);
    }

    /**
     * Remove contact
     *
     * @param Contact $contact
     * @return Response
     * @throws \Exception
     */
    public function destroy(Contact $contact): Response
    {
        $contact->delete();

        return response()->noContent();
    }
}
